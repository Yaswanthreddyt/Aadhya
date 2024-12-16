export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.init();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async init() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
  }

  async sendNotification(title: string, options?: NotificationOptions) {
    if (this.permission === 'granted') {
      return new Notification(title, options);
    }
    return null;
  }

  async scheduleNotification(
    title: string,
    timestamp: Date,
    options?: NotificationOptions
  ) {
    const delay = timestamp.getTime() - Date.now();
    if (delay > 0) {
      setTimeout(() => {
        this.sendNotification(title, options);
      }, delay);
    }
  }
}