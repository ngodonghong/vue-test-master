import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue';
import Vue from 'vue';

describe('List Surveys', () => {
  it('filter table', async () => {
    const wrapper = mount(Home);
    const textInput = wrapper.find('input#search-input');
    await textInput.setValue('xx3');
    expect((wrapper.vm as any).searchInput).toBe('xx3');
  });
})