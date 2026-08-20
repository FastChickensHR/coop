import 'styled-components';
import type { AppTheme } from './index';
declare module 'styled-components' {
    interface DefaultTheme extends AppTheme {
    }
}
