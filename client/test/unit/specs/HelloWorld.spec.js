import { shallow } from '@vue/test-utils'
import HelloWorld from '@/components/pages/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(HelloWorld)
    const message = wrapper.find('h1').text()
    expect(message).to.equal('Welcome to Your Vue.js App')
  })
});
