import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import '../../i18n';

const setting = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t('Setting')}</Text>
    </View>
  )
}

export default setting