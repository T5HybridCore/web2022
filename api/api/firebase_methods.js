class FirebaseMethods {
    constructor() {
        if (this.instance) return this.instance; // Singleton

        // New instance
        FirebaseMethods.instance = this;

        const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
        const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
        const { getAuth } = require('firebase-admin/auth');

        // Service Account
        const serviceAccount = require('./web-2022-f5262-firebase-adminsdk-fbnow-ecc67748f4.json');

        // Initialize Firebase
        initializeApp({ credential: cert(serviceAccount) });

        // Initialize Cloud Firestore and get a reference to the service
        this.db = getFirestore();

        // Initialize Auth
        this.auth = getAuth();
    }

    // Sign in
    async signIn(body) {
        const result = await this.db.collection(collection).add(body);
        body.id = body.id;
        return body;
    }

    // Get users
    async getUsers() {
        const admins = await this.db.collection('admins').get();
        const result = await this.auth.listUsers();

        const list = [];
        result.users.forEach((user) => {
            var u;
            var add = false;
            admins.forEach((doc) => {
                const admin = doc.data();

                if (user.uid === admin.uid) {
                    u = {
                        "uid": user.uid,
                        "email": user.email,
                        "emailVerified": user.emailVerified,
                        "disabled": user.disabled,
                        "metadata": {
                            "lastSignInTime": user.metadata.lastSignInTime,
                            "creationTime": user.metadata.creationTime
                        },
                        "passwordHash": user.passwordHash,
                        "passwordSalt": user.passwordSalt,
                        "tokensValidAfterTime": user.tokensValidAfterTime,
                        "providerData": [
                            {
                                "uid": user.uid,
                                "email": user.email,
                                "providerId": "password"
                            }
                        ],
                        "picture": admin.picture
                    };
                    add = true;
                }
            });

            if (add) list.push(u);
        });

        return list.length ? list : null;
    }

    // Get
    async get(collection) {
        const result = await this.db.collection(collection).orderBy('title').get();

        const list = [];
        result.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            list.push(data);
        });

        return list.length ? list : null;
    }

    // Get by id
    async getById(collection, id) {
        const result = await this.db.collection(collection).doc(id).get();
        if (!result.exists) return null;  // Record not found

        const doc = result.data();
        doc.id = result.id;
        return doc;
    }

    // Post
    async post(collection, document) {
        const result = await this.db.collection(collection).add(document);
        document.id = result.id;
        return document;
    }

    // Update
    async update(collection, id, document) {
        const doc = this.db.collection(collection).doc(id);
        const result = await doc.get();

        if (!result.exists) return null;  // Record not found

        await doc.set(document);

        document.id = id;
        return document;
    }

    // Delete
    async delete(collection, id) {
        const doc = this.db.collection(collection).doc(id)
        const result = await doc.get();

        if (!result.exists) return null; // Record not found

        await doc.delete();

        return { id };
    }

    // Search
    async search(collection, term) {
        const result = await this.db.collection(collection).get();

        const list = [];
        result.forEach((doc) => {
            const data = doc.data();

            if (data.title.toLowerCase().includes(term.toLowerCase())) {
                data.id = doc.id;
                list.push(data);
            }
        });

        return list.length ? list : null;
    }
}

module.exports = new FirebaseMethods();