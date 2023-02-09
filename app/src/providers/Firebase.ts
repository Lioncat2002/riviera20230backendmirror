import admin from "firebase-admin"
import dotenv from "dotenv";
import Log from "../middlewares/Log";
import EventsModel from "../models/event.model";
import IEvents from "../interfaces/events"

dotenv.config();

export class Firebase {
    public static init(): void {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
            });
            this.scheduleNotifications(parseInt(process.env.INTERVAL));
        } catch (err) {
            Log.error(err);
        }
    }
    private static async scheduleNotifications(interval: number): Promise<void> {
        const events = await EventsModel.find();
        for (var i = 0; i < events.length; i++) {
            const event = events[i];
            const date = new Date(event.start).getTime();
            const now = new Date().getTime();
            const diff = date - now + interval;

            if (diff > 0) {
                setTimeout(() => {
                    this.sendNotification(event, diff);
                }, diff);
                Log.info(`Scheduled notification for ${event.name} ${diff} ms from now.`);
            }
        }
    }
    private static async sendNotification(event: IEvents, diff: Number): Promise<void> {
        let notificationTitle = event.name;
        let notificationDescription = `${notificationTitle} is going to start soon!`;
        if (event.event_type === 'Proshow') {
            notificationTitle = `${notificationTitle} Proshow`
            notificationDescription = `Proshow by ${event.name} is going to start soon!`
        }
        const message = {
            notification: {
                title: notificationTitle,
                body: notificationDescription,
                image: event.image_url
            },
        };
        const options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        }
        try {
            Log.info(`$/topics/${event._id}`)
            const response = await admin.messaging().sendToTopic(`/topics/${event._id}`, message, options);
            Log.info(`Successfully sent message: ${response}`);
        } catch (err) {
            Log.error(`Error sending message: ${err}`);
        }
    }
}