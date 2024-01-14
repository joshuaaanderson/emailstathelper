# Intro
Quick Tutorial to get Stats from your gmail (or any Imap compliant e-mail service)

1. Create database table in postgres (https://github.com/joshuaaanderson/emailstathelper/blob/main/create_emails_table.sql)
2. Use someone else's template found on the Internet (https://medium.com/@akinremiolumide96/reading-email-data-with-node-js-cdacaa174cc7)
3. Create a directory npm -y init
4. Add pg, Imap, and mailparser (npm install pg, npm install imap, npm install mailparser)
5. Modify it to import my Data into postgres (https://github.com/joshuaaanderson/emailstathelper/blob/main/read_emails.js)
6. Analyze for the results

# helper info
1. In order to use gmail without any hoops you have to use the google app password generator. (https://support.google.com/accounts/answer/185833?hl=en)
2. You might need to turn off 2fa and re-enable it for it to work.

# Other Opportunities
1. select last date from the DB and only pull in new records since the last e-mail retrieved
2. store a copy of the database in the table
3. add a UI frontend for keeping track of metrics graphically (make it pretty)

# Analyze for the results
```sql
SELECT email_from,
       Count(*)
FROM   emails
WHERE  source = 'Gmail'
GROUP  BY email_from
ORDER  BY 2 
```
