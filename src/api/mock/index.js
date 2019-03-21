import checkStatusSuccess from './data/check-status.json';
import checkStatusBlocked from './data/check-status-blocked.json';

import facebookResponse from './data/facebook.json';

import securityCodeResponse from './data/generate-security-code.json';

import hasAccountResponse from './data/has-account.json';
import hasAccountResponseError from './data/error/has-account.json';

import passwordLoginSucces from './data/password.json';
import passwordLoginError from './data/error/password.json';
/**
 * Cria uma promisse para o mock desejado
 * @param {json} mockData
 * @param {number} delay em milisegundos
 */
// eslint-disable-next-line
const fetch = (mockData, delay = delay, isValid = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isValid) {
        reject(mockData);
      }

      resolve(mockData);
    }, delay);
  });
};

const users = [
  'teste@tray.com.br',
  'usuariobloqueado@tray.com.br',
];

const blockedusers = [
  'usuariobloqueado@tray.com.br',
];

const delay = 300;

/**
 * Exporta os mocks com o delay definido
 */
export default {
  /**
   * Mock para verificar o status do usúario
   * @param {object} params
   * @return {Promise}
   */
  checkUserStatus(params = {
    identification: '',
  }) {
    const { identification } = params;
    let mockData = checkStatusSuccess;

    if (blockedusers.indexOf(identification) !== -1) {
      mockData = checkStatusBlocked;
    }

    return fetch(mockData, delay);
  },

  facebookLogin() {
    return fetch(facebookResponse, delay).then(response => response);
  },

  generateSecurityCode() {
    return fetch(securityCodeResponse, delay).then(response => response);
  },

  /**
   * Mock para verificar se existe uma conta cadastrada
   * @param {object} payload
   * @return {Promise}
   */
  hasAccount(params = {
    identification: '',
  }) {
    const { identification } = params;

    let isValid = false;
    let mockData = hasAccountResponseError;

    if (users.indexOf(identification) !== -1) {
      isValid = true;
      mockData = hasAccountResponse;
    }

    return fetch(mockData, delay, isValid);
  },

  /**
   * Mock para o login de senha
   * @param {object} params
   * @return {Promise}
   */
  passwordLogin(params = {
    password: '',
  }) {
    const { password } = params;
    let isValid = false;
    let mockData = passwordLoginError;

    if (password === 'senhacorreta') {
      isValid = true;
      mockData = passwordLoginSucces;
    }

    return fetch(mockData, delay, isValid);
  },
};