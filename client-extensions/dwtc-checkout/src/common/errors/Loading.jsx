import React from "react";
import {Provider} from '@clayui/core';
import LoadingIndicator from '@clayui/loading-indicator';

export function Loading(){
    return(
        <div>
            <Provider spritemap="/public/icons.svg">
                <div className="p-4">
                    <LoadingIndicator displayType="secondary" size="sm" />
                </div>
		    </Provider>
        </div>
    )
}