const Imap = require('imap');
const fs = require('fs');
const {
    simpleParser
} = require('mailparser');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'password123',
});

async function deleteEmails() {
    try {
        const result = await pool.query("delete from emails");
    } catch (error) {
        console.log(error);
    }
}

async function insertEmail(var1, var2, var3, var4) {
    try {
        const result = await pool.query('INSERT INTO emails (date_received, email_from, subject, source) VALUES ($1, $2, $3, $4)', [var1, var2, var3, var4]);
    } catch (error) {
        console.log(error);
    }
}


const imapConfig = {
    user: 'user@gmail.com',
    password: 'app password',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false,
    },
    connectTimeout: 100000,
    authTimeout: 3000,
};

const getEmails = () => {
    try {
        deleteEmails();
        const imap = new Imap(imapConfig);
        imap.once('ready', () => {
            imap.openBox('INBOX', false, () => {
                imap.search(['ALL', ['SINCE', new Date("December 17, 1995 03:24:00")]], (err, results) => {
                    const f = imap.fetch(results, {
                        bodies: ''
                    });
                    f.on('message', msg => {
                        msg.on('body', stream => {
                            simpleParser(stream, async (err, parsed) => {
                                // const {from, subject, textAsHtml, text} = parsed;
                                //var content = '"' + parsed.date.toLocaleString() + '","' + parsed.from.value[0].address + '","' + parsed.subject + '"\n';

                                insertEmail(parsed.date.toLocaleString(), parsed.from.value[0].address, parsed.subject, "Gmail");

                            });
                        });
                    });
                    f.once('error', ex => {
                        return Promise.reject(ex);
                    });
                    f.once('end', () => {
                        console.log('Done fetching all messages!');
                        imap.end();
                    });
                });
            });
        });

        imap.once('error', err => {
            console.log(err);
        });

        imap.once('end', () => {
            console.log('Connection ended');
            pool.end();
        });

        imap.connect();
    } catch (ex) {
        console.log('an error occurred');
    }
};

getEmails();
