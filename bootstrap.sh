cd dev/hapi/blog
service elasticsearch start
service rethinkdb start
rethinkdb --daemon --initial-password admin --directory /home/fathi/rethinkdb/data/blog
nodemon index.js