describe('Swagger Petstore API Test user entity', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    it('should creates list of users with given input array', () => {
        const user = [{
            id: 1,
            username: 'Anabel',
            firstName: 'Anabel',
            lastName: 'Dodg',
            email: 'anabel@mail.com',
            password: '123',
            phone: '123456789',
            userStatus: 1
        }];

        cy.request({
            method: 'POST',
            url: `${baseUrl}/user/createWithList`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should get user by user name', () => {
        const userName = 'Anabel';

        cy.request({
            method: 'GET',
            url: `${baseUrl}/user/${userName}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('firstName', userName);
        });
    });

    it('should update user', () => {
        const userName = 'Anabel';
        const newName = {
            id: 1,
            username: 'Sancho',
            firstName: 'Anabel',
            lastName: 'Dodg',
            email: 'anabel@mail.com',
            password: '123',
            phone: '123456789',
            userStatus: 1
        };

        cy.request({
            method: 'PUT',
            url: `${baseUrl}/user/${userName}`,
            body: newName
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should delete user', () => {
        const newUser = [{
            id: 2,
            username: 'Jack',
            firstName: 'Jackaby',
            lastName: 'Mark',
            email: 'jack@mail.com',
            password: '345',
            phone: '345123',
            userStatus: 1
        }];

        cy.request({
            method: 'POST',
            url: `${baseUrl}/user/createWithList`,
            body: newUser
        }).then((response) => {
            expect(response.status).to.eq(200);
            
            const userName = newUser[0].username;

        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/user/${userName}`
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

    });
    });

    it('should logs user into the system', () => {
        const user = [{
            id: 1,
            username: 'Anabela',
            firstName: 'Mia',
            lastName: 'Ram',
            email: 'bel@mail.com',
            password: '321',
            phone: '123456789',
            userStatus: 1
        }];

        cy.request({
            method: 'POST',
            url: `${baseUrl}/user/createWithList`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(200);

            const usernameLog = user[0].username;
            const passwordLog = user[0].password;

            cy.request({
                method: 'GET',
                url: `${baseUrl}/user/login`,
                username: usernameLog,
                password: passwordLog

            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        });
    });


    it('should log out user', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/user/logout`,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });


    it('should create user', () => {
        const newUser = {
            id: 3,
            username: 'Mira',
            firstName: 'Mia',
            lastName: 'Pain',
            email: 'mira@mail.com',
            password: '321',
            phone: '987654321',
            userStatus: 1
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/user`,
            body: newUser
        }).then((response) => {
            expect(response.status).to.eq(200);

        })
    })

});