/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';

 describe('Test pushToHistory', () => {

    test('case of settings - history length', () => {
        pushToHistory('settings',2);
        expect(history.length).toBe(2);
    });

    test('case of settings - current state object', () => {
        expect(history.state).toEqual({page: 'settings'});
    });

    test('case of entry - history length', () => {
        pushToHistory('entry',2);
        expect(history.length).toBe(3);
    });

    test('case of entry - current state object', () => {
        pushToHistory('entry',2);
        expect(history.state).toEqual({page: 'entry2'});
    });
    
    test('case of default - history length', () => {
        pushToHistory('default',2);
        expect(history.length).toBe(5);
    });

    test('case of default - current state object', () => {
        expect(history.state).toEqual({});
    });
 });