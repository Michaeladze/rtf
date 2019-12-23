import React from 'react';
import './TabContainer.scss';
import 'antd/lib/tabs/style/index.css';
import Tabs from 'antd/lib/tabs';

interface INewTabContainerProps {
  tabs: ITab[];
  /** Номер активного таба по умолчанию */
  defaultActiveTab?: number;
}

export interface ITab {
  id: number;
  label: string;
  content: React.ReactNode;
  handler?: (args: any) => void;
}

const TabContainer: React.FC<INewTabContainerProps> = ({
  defaultActiveTab = 1,
  tabs
}) => {
  const { TabPane } = Tabs;

  const tabsJSX = tabs.map((tab) => (
    <TabPane tab={tab.label} key={`${tab.id}`}>
      {tab.content}
    </TabPane>
  ));

  return (
    <div className='tabs'>
      <Tabs defaultActiveKey={`${defaultActiveTab}`}>{tabsJSX}</Tabs>
    </div>
  );
};
export default TabContainer;
