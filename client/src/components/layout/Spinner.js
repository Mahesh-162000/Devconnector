import React, { Fragment } from 'react';
import Spinner from '../layout/spinner.gif';

const SpinnerComponent = () => {
    <Fragment>
        <img
            src={Spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
};

export default SpinnerComponent;