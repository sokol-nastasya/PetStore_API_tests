describe('Swagger Petstore API Test pet entity', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';

  it('should get list of available pets', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/pet/findByStatus`,
      qs: { status: 'available' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach((pet) => {
        expect(pet).to.have.property('id');
        if( pet.hasOwnProperty('name')) {
          expect(pet).to.have.property('name');
        }
        expect(pet).to.have.property('status', 'available');
      });
    });
  });

  it('should find pet by Id', () => {
    const newPet = {
      id: 5,
      name: "Marry",
      status: "available"
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
    });

    cy.request({
      method:'GET',
      url: `${baseUrl}/pet/${newPet.id}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('status');

    })
  })

  it('should add a new pet', () => {
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
      expect(response.body).to.have.property('id', newPet.id);
      expect(response.body).to.have.property('name', newPet.name);
      expect(response.body).to.have.property('status', newPet.status);
    });
  });

  it('should updates a pet in the store with form data', () => {
    const petId = 4;

    cy.request({
      method: 'POST',
      url: `${baseUrl}/pet/${petId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });


  it('should update pet', () => {
    const updatePet = {
      id: 4,
      name: "Eva",
      status: "available"
    };

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/pet`,
      body: updatePet,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', updatePet.id);
      expect(response.body).to.have.property('name', updatePet.name);
      expect(response.body).to.have.property('status', updatePet.status);
    })
  });

  it("should update a pet file", () => {
    const petId = 4;
    const fileName = 'jack.jpg';

    cy.fixture(fileName, 'binary').then((fileContent) => {
      const blob = Cypress.Blob.binaryStringToBlob(fileContent);

      const formData = new FormData();
      formData.append('file', blob, fileName);

      cy.request({
        method: 'POST',
        url: `${baseUrl}/pet/${petId}/uploadImage`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

  });

  it("should delete a pet", () => {
    const petId = 4;

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/pet/${petId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message');
    })
  })
  


});