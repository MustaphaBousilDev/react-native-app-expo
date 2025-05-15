import React from 'react';
import { View, ViewProps, I18nManager } from 'react-native';

interface RTLViewProps extends ViewProps {
  reverse?: boolean;
}

const RTLView: React.FC<RTLViewProps> =({
    children, 
    style, 
    reverse = false, 
    ...props 
})  => {
    const isRTL = I18nManager.isRTL;
    const shouldReverse = reverse ? !isRTL : isRTL;
    return (
        <View
            style={[{flexDirection: shouldReverse ? 'row-reverse' : 'row'},style,]}
            {...props}
        >
            {children}
        </View>
    );
}
export default RTLView;