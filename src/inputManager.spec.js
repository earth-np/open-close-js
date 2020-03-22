import { InputManager } from './inputManager';

describe('Input Manager Module', () => {
  it('should initiate input manager successfully', () => {
    const inputManager = new InputManager();
    expect(inputManager).not.toBeNull();
  });
  it('should receive input from keyboard', () => {});

  it('should convert input text to turn action', () => {
    const inputManager = new InputManager();

    const inputs = [
      {
        text: 'OC2',
        action: {
          hand1: 'O',
          hand2: 'C',
          numberOfOpenHand: 2,
        },
      },
      {
        text: 'OC',
        action: {
          hand1: 'O',
          hand2: 'C',
        },
      },
      {
        text: 'OO',
        action: {
          hand1: 'O',
          hand2: 'O',
        },
      },
    ];
    const actions = inputs.map(input => inputManager.textToAction(input.text));
    expect(actions).toEqual(inputs.map(input => input.action));
  });
  it('should thorw an error in case input is invalid', () => {
    const inputManager = new InputManager();
    let thrownErrorMsg;
    try {
      inputManager.validateInput('chicken');
    } catch (error) {
      thrownErrorMsg = error.message;
    }
    expect(thrownErrorMsg).toEqual(InputManager.ERROR.TYPE_1);
    try {
      inputManager.validateInput('OO8');
    } catch (error) {
      thrownErrorMsg = error.message;
    }
    expect(thrownErrorMsg).toEqual(InputManager.ERROR.TYPE_2);
    try {
      inputManager.validateInput('OOO');
    } catch (error) {
      thrownErrorMsg = error.message;
    }
    expect(thrownErrorMsg).toEqual(InputManager.ERROR.TYPE_2);
    try {
      inputManager.validateInput('444');
    } catch (error) {
      thrownErrorMsg = error.message;
    }
    expect(thrownErrorMsg).toEqual(InputManager.ERROR.TYPE_1);
  });
});
