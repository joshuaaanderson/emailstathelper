SELECT email_from,
       Count(*)
FROM   emails
WHERE  source = 'Gmail'
GROUP  BY email_from
ORDER  BY 2 
