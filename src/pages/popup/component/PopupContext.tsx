import React from 'react'
import { GlobalConfig } from '../api/GlobalConfigApi'

export const PopupContext = React.createContext<GlobalConfig>({} as any)
