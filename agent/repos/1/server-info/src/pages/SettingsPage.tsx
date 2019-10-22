import React from 'react';
import SettingsEdit from "../components/SettingsEdit/container";
import SettingsView from "../components/SettingsView/container";

const SettingsPage = () => {
  return (
    <div className='settings-page'>
      <SettingsEdit/>
      <SettingsView/>
    </div>
  );
};

export default SettingsPage;