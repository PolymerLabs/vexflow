import { expect, fixture, html } from '@open-wc/testing';

describe('vf-stave', () => {
  it('no attributes renders empty stave', async () => {
    const element = await fixture(html`
      <vf-score>
        <vf-stave></vf-stave>
      </vf-score>
    `);

    expect(element).shadowDom.to.equal(`
      <div id="vf-score" style="width: 500px;">
        <slot></slot>
        <svg width="500" height="200" viewBox="0 0 500 200" style="width: 500px; height: 200px;">
          <path stroke-width="1" fill="none" stroke="#999999" stroke-dasharray="none" d="M10 80L410 80"></path>
          <path stroke-width="1" fill="none" stroke="#999999" stroke-dasharray="none" d="M10 90L410 90"></path>
          <path stroke-width="1" fill="none" stroke="#999999" stroke-dasharray="none" d="M10 100L410 100"></path>
          <path stroke-width="1" fill="none" stroke="#999999" stroke-dasharray="none" d="M10 110L410 110"></path>
          <path stroke-width="1" fill="none" stroke="#999999" stroke-dasharray="none" d="M10 120L410 120"></path>
          <rect stroke-width="0.3" fill="black" stroke="black" stroke-dasharray="none" x="10" y="79.5" width="1" height="41"></rect>
          <rect stroke-width="0.3" fill="black" stroke="black" stroke-dasharray="none" x="410" y="79.5" width="1" height="41"></rect>
        </svg>
      </div>
    `);
  });
})