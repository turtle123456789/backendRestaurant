use restaurant;
insert into Users (Users.email, Users.password, Users.firstName, Users.lastName, Users.address, Users.roleId,  Users.phoneNumber, Users.image ,Users.type_register, Users.createdAt, Users.updatedAt) 
VALUES ('admin@gmail.com', '12345678', 'Long', 'Bui', 'Ha Noi', 1, '0123456789', 'null', 1, NOW(), NOW());