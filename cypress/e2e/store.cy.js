describe('Swagger Petstore API Test store entity', () => {
    const baseUrl = 'https://petstore.swagger.io/v2';

    it("should returns pet inventories by status", () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/store/inventory`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('{{PetStatus-Updated}}');
            expect(response.body).to.have.property('sold');
            expect(response.body).to.have.property('big');
            expect(response.body).to.have.property('available');
            expect(response.body).to.have.property('not available');
            expect(response.body).to.have.property('string');
        });
    });

    it('should place an order for a pet', () => {
        const newPet = {
            id: 4,
            name: "Jack D",
            status: 'available'
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/pet`,
            body: newPet,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })

        const order = {
            id:1,
            petId: newPet.id,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true
        }

        cy.request({
            method: 'POST',
            url: `${baseUrl}/store/order`,
            body: order,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', order.id);
            expect(response.body).to.have.property('petId', order.petId);
            expect(response.body).to.have.property('quantity', order.quantity);
            expect(response.body).to.have.property('status', order.status);
        });
    });


    it('should find purchase order by ID', () => {
        const orderId = 1;
        cy.request({
            method: 'GET',
            url: `${baseUrl}/store/order/${orderId}`
        }).then((request) => {
            expect(request.status).to.eq(200);
            expect(request.body).to.have.property('id', orderId);
        });
    });

    it('should delete order by ID', () => {
        const orderId = 1;
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/store/order/${orderId}`
        }).then((request) => {
            expect(request.status).to.eq(200);
        })
    })

});