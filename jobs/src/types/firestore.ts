import { Job } from '@/providers/jooble';

export type FirestoreJob = Job & {
    docId: string;
};

export class FirestoreUser {
    public uid!: string;
    public email!: string;
    public jobFavorites!: string[];
}
