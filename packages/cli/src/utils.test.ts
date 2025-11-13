import {slugify} from '@utils';

describe("utils", () => {
  it('should slugify text', () => {
    expect(slugify("Hello World")).toEqual("hello-world");
  });
})
