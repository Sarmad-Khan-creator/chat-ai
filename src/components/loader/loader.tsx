import { Loader } from 'lucide-react';
import React from 'react';

const Spinner = () => {
  return (
    <div>
      <Loader className="animate-spin" size={20} />
    </div>
  );
};

export default Spinner;
