class FirebaseMethods {
    constructor() {
        if (this.instance) return this.instance; // Singleton

        // New instance
        FirebaseMethods.instance = this;

        const { initializeApp, cert } = require('firebase-admin/app');
        const { getFirestore } = require('firebase-admin/firestore');
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

    // Get customers
    async getCustomers() {
        const result = await this.auth.listUsers();

        const list = [];
        result.users.forEach((user) => {
            if (!user.customClaims) list.push(user);
        });

        return list.length ? list : null;
    }

    // Get customer
    async getCustomer(uid) {
        const result = await this.auth.getUser(uid);
        return result ? result : null;
    }

    // Add customer
    async addCustomer(customer) {
        const result = await this.auth.createUser(customer);
        var uid = result.uid;

        // Create cart
        const r = this.db.collection('cart').doc(uid).set({'products': []});

        return { uid };
    }

    async updateCustomer(uid, customer) {
        const result = await this.auth.updateUser(uid, customer);
        var uid = result.uid;
        return { uid };
    }

    async deleteCustomer(uid) {
        await this.auth.deleteUser(uid);
        var code = '1';
        return { code };
    }

    // Get users
    async getUsers() {
        const result = await this.auth.listUsers();

        const list = [];
        result.users.forEach((user) => {
            if (user.customClaims && user.customClaims['admin']) list.push(user);
        });

        return list.length ? list : null;
    }

    // Add user
    async addUser(user) {
        const result = await this.auth.createUser(user);
        var uid = result.uid;

        await this.auth.setCustomUserClaims(uid, {admin: true});
        return { uid };
    }

    async updateUser(uid, user) {
        const result = await this.auth.updateUser(uid, user);
        var uid = result.uid;
        return { uid };
    }

    async deleteUser(uid) {
        await this.auth.deleteUser(uid);
        var code = '1';
        return { code };
    }

    // Get
    async get(collection) {
        const result = await this.db.collection(collection).get();

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

    // Recipe videos
    async getRecipes(collection) {
        const result = await this.db.collection(collection).get();

        const list = [];
        result.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            list.push(data);
        });

        return list.length ? list : null;
    }
}

module.exports = new FirebaseMethods();