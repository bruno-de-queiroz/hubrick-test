import React from 'react';
import Report from '../report.component';
import renderer from 'react-test-renderer';

test('should render the component', () => {
    const data = {id: 'a', state: 'OPEN', payload: {reportId: 'bcada', reportType: 'SCAM', message: 'Test'}};
    const component = renderer.create(<Report data={data} onBlock={() => {}} onResolve={() => {}}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});