const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string value', () => {
        var res = isRealString(23);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow strings with only non-space characters', () => {
        var res = isRealString('  Troy   ');
        expect(res).toBe(true);
    });
});