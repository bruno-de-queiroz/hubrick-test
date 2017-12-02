import React from 'react';
import ReportList from '../report-list.component';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from "enzyme";

configure({ adapter: new Adapter() });

it('should render the components', () => {
    const data = [{id: 'a', state: 'OPEN', payload: {reportId: 'bcada', reportType: 'SCAM', message: 'Test'}}];
    const component = renderer.create(<ReportList items={data} onBlock={() => {}} onResolve={() => {}}/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('should filter out the closed tickets', () => {
    const data = [
        {id: 'a', state: 'OPEN', payload: {reportId: 'bcada', reportType: 'SCAM', message: 'Test'}},
        {id: 'b', state: 'CLOSED', payload: {reportId: 'cbada', reportType: 'SCAM', message: 'Test'}},
    ];
    const component = mount(<ReportList items={data} onBlock={() => {}} onResolve={() => {}}/>);
    expect(component.find('.report-item').length).toBe(1);
});