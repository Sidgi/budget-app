# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
  User.create(username: 'username',email:'admin@gmail.com', password: 1234567,)
  Wallet.create(name: 'Default',currency:'Dollar', limit: 1000,cash_or_credit:'Cash',total:0,user_id:1)
