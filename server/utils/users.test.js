const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'James',
            room: 'Node'
        },{
            id: '2',
            name: 'Pepper',
            room: 'React'
        },{
            id: '3',
            name: 'Jen',
            room: 'Node'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '12',
            name: 'Ayudh',
            room: 'Office fans'
        };
        var resUser = users.addUsers(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', ()=> {
        var userId = '999';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', ()=> {
        var userId = '2';

        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', ()=> {
        var userId = '999';

        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return name for Node', ()=> {
        var userList = users.getUserList('Node');

        expect(userList).toEqual(['James','Jen']);
    });

    it('should return name for React', ()=> {
        var userList = users.getUserList('React');

        expect(userList).toEqual(['Pepper']);
    });
});