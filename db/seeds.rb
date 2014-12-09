# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Post.destroy_all

posts = Post.create( user:Dave Wilkinson, title: 'London', body: 'lovely')
p2=Post.create(title:'Bristol', body: 'sunnny')
p3=Post.create(title: 'Paris', body: 'safe')
p4=Post.create(title: 'Chelsea', body: 'brewery')
p5=Post.create(title: 'Belfast', body: 'brewery')
p6=Post.create(title: 'Sydney', body: 'brewery')
p7=Post.create(title: 'Hamburg', body: 'brewery')
p8=Post.create(title: 'Watford', body: 'brewery')
p9=Post.create(title: 'Dehli', body: 'brewery')
p10=Post.create(title: 'Farringdon', body: 'general assembly')
