import { forwardRef } from 'react';

const ComponentToPrint = forwardRef(( props, ref ) => {
  return (
  <div ref={ref}>
    <p>
        Evo neki tekstttttt
    </p>
  </div>
)});

export default ComponentToPrint;