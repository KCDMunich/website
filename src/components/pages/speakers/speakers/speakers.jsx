/* eslint-disable react/prop-types */
import React from 'react';

const scriptUrl = 'https://sessionize.com/api/v2/cos5nif6/view/Speakers';

const Speakers = () => (
    <section className="safe-paddings relative bg-white pb-40 lg:pb-32 md:py-24 sm:py-16">
      <div className="container flex justify-between lg:flex-col">
        <div className="text-primary-1 lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
          <br/>
            <DangerComponent />
      </div>
      </div>
    </section>
  );

  const DangerComponent = () => {
    return (
        <iframe
            title="External Script"
            srcDoc={`<script src="${scriptUrl}"></script>`}
            border="0"
            width="400%"
            height="600px"
        />

    );
};

export default Speakers;