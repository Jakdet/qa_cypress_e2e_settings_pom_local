/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject'
import homePageObject from '../support/pages/home.pageObject'
import { faker } from '@faker-js/faker'

const signInPage = new SignInPageObject()
const homePage = new homePageObject()

describe('Settings page', () => {
  beforeEach(() => {


    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {

    });
    cy.register();
    cy.login();
    cy.visit('/settings');
  })

  it('should provide an ability to update username', () => {
    const userName =
      'testuser_' + faker.string.alpha({ length: 5 }).toLowerCase();
    cy.getByDataCy(':nth-child(2) > .form-control').clear().type(userName);
    cy.getByDataCy('form > :nth-child(1) > .btn').click();
    cy.getByDataCy('[data-cy="profile-link"]').should('contain', userName);
  });

  it('should provide an ability to update bio', () => {
    const randombio = faker.image.avatar();

    cy.getByDataCy(':nth-child(3) > .form-control').clear().type(randombio);
    cy.getByDataCy('form > :nth-child(1) > .btn').click();
    cy.getByDataCy('.col-xs-12 > p').should('have.text', randombio);
  });

  it('should provide an ability to update an email', () => {
    const randomEmail = faker.internet.email().toLowerCase();

    cy.getByDataCy(':nth-child(4) > .form-control').clear().type(randomEmail);
    cy.getByDataCy('form > :nth-child(1) > .btn').click();
    cy.visit('/settings');
    cy.getByDataCy(':nth-child(4) > .form-control').should('have.value', randomEmail);
  });

  it('should provide an ability to update password', () => {
    const randomPassword = faker.internet.password();

    cy.getByDataCy(':nth-child(5) > .form-control').clear().type(randomPassword);
    cy.getByDataCy('form > :nth-child(1) > .btn').click();
    cy.getByDataCy('.btn-outline-danger').click();
    cy.login('riot@qa.team', randomPassword);
    cy.visit('/');
    cy.getByDataCy('[data-cy="profile-link"]').should('contain', 'riot');
  });
});
