/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject'
import homePageObject from '../support/pages/home.pageObject'
import { faker } from '@faker-js/faker'

const signInPage = new SignInPageObject()
const homePage = new homePageObject()

describe('Settings page', () => {
  beforeEach(() => {
    let user

    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    });
    cy.register();
    cy.login();
    cy.visit('/settings');
  })

  it('should provide an ability to update username', () => {
    const userName =
      'testuser_' + faker.string.alpha({ length: 5 }).toLowerCase();
    cy.getByPlaceholder('Username').clear().type(userName);
    cy.getButton('submit').click().wait(2000);
    cy.get('h4').should('contain', userName);
  });

  it('should provide an ability to update bio', () => {
    const randombio = faker.image.avatar();

    cy.getByPlaceholder('Short bio about you').clear().type(randombio);
    cy.getButton('submit').click();
    cy.get('h4').next('p').should('have.text', randombio);
  });

  it('should provide an ability to update an email', () => {
    const randomEmail = faker.internet.email().toLowerCase();

    cy.getByPlaceholder('Email').clear().type(randomEmail);
    cy.getButton('submit').click();
    cy.visit('/settings');
    cy.getByPlaceholder('Email').should('have.value', randomEmail);
  });

  it('should provide an ability to update password', () => {
    const randomPassword = faker.internet.password();

    cy.getByPlaceholder('New Password').clear().type(randomPassword);
    cy.getButton('submit').click();
    cy.visit('/');
    cy.visit('/settings');
    cy.get('.btn-outline-danger').click();
    cy.login('riot@qa.team', randomPassword);
    cy.visit('/');
    cy.get('[data-cy="profile-link"]').should('contain', 'riot');
  });
});
