insert into rate (quote, rating, ip)
values ($1, $2, $3) returning rating;