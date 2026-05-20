const mongoose = require('mongoose'); // Importing mongoose to interact with MongoDB


async function connectToDb() {
    const primaryUri = process.env.MONGO_URI;
    const fallbackUri = process.env.MONGO_LOCAL_URI; // optional local fallback
    // connectToDb invoked

    if (!primaryUri && !fallbackUri) {
        console.log('No Mongo URI configured; starting in-memory MongoDB for development.');
    }

    // Try primary then fallback; use a short serverSelectionTimeoutMS so failures are quick
    const opts = { serverSelectionTimeoutMS: 5000 };

    const dns = require('dns').promises;

    // Helper to try connecting to a URI
    const tryConnect = async (uri) => {
        try {
            await mongoose.connect(uri, opts);
            console.log('Connected to DB:', uri.startsWith('mongodb+srv://') ? '(primary SRV)' : uri);
            return true;
        } catch (err) {
            console.log('DB connection failed for', uri, '-', err.message || err);
            return false;
        }
    };

    // Attempt primary if present
    if (primaryUri) {
        if (primaryUri.startsWith('mongodb+srv://')) {
            try {
                const m = primaryUri.match(/^mongodb\+srv:\/\/(?:[^@]+@)?([^\/]+)/i);
                const host = m && m[1];
                if (host) {
                    try {
                        // Use Cloudflare resolver in-process to avoid system DNS restrictions
                        try { require('dns').setServers(["1.1.1.1"]); } catch (_) {}
                        await dns.resolveSrv(`_mongodb._tcp.${host}`);
                    } catch (dnsErr) {
                        console.log('SRV DNS lookup failed for host', host, '-', dnsErr.code || dnsErr.message);
                        console.log('Skipping primary SRV URI and trying fallback (if any)');
                    }
                }
            } catch (err) {
                console.log('Failed to validate SRV host, will attempt primary connect anyway');
            }
        }

        const ok = await tryConnect(primaryUri);
        if (ok) return;
    }

    // Attempt fallback local URI
    if (fallbackUri) {
        const ok = await tryConnect(fallbackUri);
        if (ok) return;
    }

    // As last resort, try an in-memory MongoDB (mongodb-memory-server) if available
    try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        console.log('Starting in-memory MongoDB for development...');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        const ok = await tryConnect(uri);
        if (ok) return;
        console.log('In-memory MongoDB start failed.');
    } catch (err) {
        console.log('mongodb-memory-server not available or failed:', err.message || err);
    }

    console.log('DB connection attempts failed; application will continue without DB.');
}

module.exports = connectToDb;