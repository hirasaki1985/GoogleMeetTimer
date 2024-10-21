import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

/**
 * state
 */
interface GoogleMeetSettingContextState {
  isReady: boolean;
  meetingId: string;
}

const initGoogleMeetSettingContextState =
  (): GoogleMeetSettingContextState => ({
    isReady: false,
    meetingId: '',
  });

/**
 * action
 */
export interface GoogleMeetSettingContextAction {
  setUp: () => void;
}
export const initGoogleMeetSettingContextAction =
  (): GoogleMeetSettingContextAction => ({
    setUp: () => {},
  });

/**
 * context
 */
export type GoogleMeetSettingContextValues = {
  state: GoogleMeetSettingContextState;
  action: GoogleMeetSettingContextAction;
};
const initGoogleMeetSettingContext = (): GoogleMeetSettingContextValues => ({
  state: initGoogleMeetSettingContextState(),
  action: initGoogleMeetSettingContextAction(),
});

export const GoogleMeetSettingContext =
  createContext<GoogleMeetSettingContextValues>(initGoogleMeetSettingContext());
export const useGoogleMeetSettingContext = () =>
  useContext(GoogleMeetSettingContext);

/**
 * provider
 */
export interface GoogleMeetSettingProviderProps {
  children?: ReactNode;
  defaultState?: GoogleMeetSettingContextState;
}

export const GoogleMeetSettingContextProvider = ({
  children,
  defaultState = initGoogleMeetSettingContextState(),
}: GoogleMeetSettingProviderProps) => {
  // state
  const [isReady, setIsReady] = useState<boolean>(defaultState?.isReady);
  const [meetingId, setMeetingId] = useState<string>(defaultState?.meetingId);

  /**
   * 設定をstateに反映する
   */
  const setUp = useCallback(() => {
    const _currentUrl = window.location.href;

    console.log('GoogleMeetSettingContext _currentUrl', _currentUrl);
    if (_currentUrl == null || _currentUrl === '') return;

    const _match = _currentUrl.match(/\/([a-z]{3}-[a-z]{4}-[a-z]{3})/);

    // const path = url.pathname.split('/')[1];
    if (_match) {
      const _meetingId = _match[1];
      setMeetingId(_meetingId);
    } else {
      console.log('Meeting ID not found');
    }
    setIsReady(true);
  }, []);

  console.log('GoogleMeetSettingContext state', {
    isReady,
    meetingId,
  });

  /**
   * value
   */
  const value: GoogleMeetSettingContextValues = {
    state: {
      isReady,
      meetingId,
    },
    action: {
      setUp,
    },
  };

  return (
    <GoogleMeetSettingContext.Provider value={value}>
      {children}
    </GoogleMeetSettingContext.Provider>
  );
};
