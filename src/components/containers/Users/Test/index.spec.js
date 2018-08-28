import React from "react";
import { shallow, mount } from "enzyme";
import Users from "../index";

describe("Users", () => {
  let usersWrapperMount;
  let usersWrapperShallow;

  beforeEach(() => {
    //Mock fetch API used for getting users list.
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: function() {
          let mockObj = {
                          data : [
                                    {
                                      id: 6,
                                      first_name: "Eve1",
                                      last_name: "Holt1",
                                      avatar:
                                        "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
                                    }
                                  ],
                          };
          return Promise.resolve(mockObj)
        },
        status: 200}));
        usersWrapperShallow = shallow(<Users />);
        usersWrapperMount = mount(<Users />);
  });

  test('calls componentDidMount', () => {
      const spy = jest.spyOn(Users.prototype, 'componentDidMount');
      usersWrapperShallow.instance().componentDidMount();
      expect(spy).toHaveBeenCalled();
  });

  test("should render with required props", () => {
    expect(usersWrapperShallow).toMatchSnapshot();
  })

  test("renders a h1", () => {
    const h1 = usersWrapperShallow.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  test("should delete user on click", () => {
    const deleteUserHandlerSpy = jest.spyOn(usersWrapperMount.instance(), "deleteUserHandler");
    usersWrapperMount.find('.delete-user').first().simulate('click');
    expect(usersWrapperMount.state().users.length).toEqual(2);
  });

  test("renders message when no users present", () => {
    usersWrapperShallow.setState({ users: [] });
    const div = usersWrapperShallow.find(".no-user-msg");
    expect(div.text()).toEqual("No users found!");
  });
 
  test("renders users first and last name", () => {
      const userName = usersWrapperMount.find(".user-name");
      expect(userName.length).toEqual(3);
  });

  test("renders delete user link", () => {
      const deletelink = usersWrapperMount.find(".delete-user");
      expect(deletelink.length).toEqual(3);
  });
  
  test("renders users avatar", () => {
      const userAvatar = usersWrapperMount.find(".user-avatar");
      expect(userAvatar.length).toEqual(3);
  });

});

describe("Users API Error", () => {
  let usersWrapper;

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        json: function() {
          let mockObj = {
                          data : null
                          }
          return Promise.resolve(mockObj)
        },
        status: 404}));
        usersWrapper = shallow(<Users />);   
    
  });

  test("should not render when problem with API", () => {
    expect(usersWrapper).toMatchSnapshot();
  });
});
