import React, { useEffect } from 'react';

const TypebotComponent = () => {
  useEffect(() => {
    if (window.Typebot) { // Ensure Typebot is loaded
      window.Typebot.initStandard({ typebot: "my-typebot-uz3f6m9" });
    }
  }, []);

  return (
    <div className='flex flex-row'>
      <typebot-standard style={{ width: '300px', height: '600px' }}></typebot-standard>
    </div>
  );
};

export default TypebotComponent;
