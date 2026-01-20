SELECT email, code, type, createdAt, expiresAt, used 
FROM verificationCodes 
WHERE email = 'siuminghe@gmail.com' 
ORDER BY createdAt DESC 
LIMIT 1;
