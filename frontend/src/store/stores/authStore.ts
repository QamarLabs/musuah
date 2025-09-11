import {
  makeAutoObservable,
  runInAction
} from "mobx";
import { getPersistedStore, makePersistable } from 'mobx-persist-store';
import agent from "../../api/agent";
import { store } from "../";
import {
  UploadProfilePictureDto,
  UserChangePassword,
  UserFormValues,
  UserLogin
} from "../../models/auth";
import Auth from "../../common/util/auth";
import { DEFAULT_REGISTER_FORM, DEFAULT_REGISTRATION_SUBMITTED_CONFIG, EXPIRE_TIME_AUTH_STORE, EXPIRE_TIME_SUBMITTED_REGISTRATION } from "../../common/constants/form";
import { MuslimWikiSession, RegistrationForm, RegistrationUserDto, SessionUser } from "../../typings.d";
import { setExpirationDate } from "../../common/util/format";
import { router } from "../../router";

export default class AuthStore {
  userSession: SessionUser | null = null;
  userSessionToken: string | null = null;
  isCouncilMember: boolean | undefined = undefined;
  setUserSessionToken = (token: string | null) => {
    this.userSessionToken = token;
  }
  setUserSession = (authUserSession: SessionUser | null) => {
    this.userSession = authUserSession;
  }
  setIsCouncilMember = (val: boolean | undefined) => {
    this.isCouncilMember = val;
  }
  private auth: Auth | null = null;
  initializeFromStorage = async () => {
    if (!this.auth)
      this.auth = new Auth();

    const token = this.auth?.getToken();
    if (token) {
      this.setUserSessionToken(token);
      const loggedInUser = await agent.auth.validateToken(token);
      console.log('loggedInuser:', JSON.stringify(loggedInUser))
      this.setUserSession(loggedInUser);
      console.log("Found existing session token");
      const { cM } = await agent.dashboard.check(token);
      console.log("CM:", cM)
      this.setIsCouncilMember(cM);
    }
  }


  loadingInitial = true;
  refreshTokenTimeout: any;
  clientId: string | null = null;
  editMode: boolean = false;
  roleList: any[] = [];
  returnMessage: string = "";

  selectedUser: UserFormValues | undefined = undefined;
  forgotPasswordReset = false;

  submittingRegister: boolean = false;
  registrationValues: RegistrationForm = DEFAULT_REGISTER_FORM;
  registrationStep: number = 0;
  registrationSubmitted: { submitted: boolean, expires: Date | undefined } = DEFAULT_REGISTRATION_SUBMITTED_CONFIG;
  setSubmittingRegister = (val: boolean) => {
    this.submittingRegister = val;
  }
  setRegistrationStep = (step: number) => {
    this.registrationStep = step;
  };
  setRegistrationValues = (values: RegistrationForm) => {
    this.registrationValues = values;
  }
  setRegistrationSubmitted = (val: { submitted: boolean, expires: Date | undefined }) => {
    this.registrationSubmitted = val;
  }

  constructor() {
    this.auth = new Auth();
    makeAutoObservable(this);
    makePersistable(this,
      {
        name: 'AuthStore',
        properties: ['registrationStep', 'registrationValues'],
        storage: window.sessionStorage,
        expireIn: EXPIRE_TIME_AUTH_STORE,
      });
  }


  get isLoggedIn() {
    return !!this.userSession;
  }

  checkAsync = async (): Promise<boolean> => {
    let cm = false;
    try {
      if (!this.userSessionToken) return cm;
      const { cM } = await agent.dashboard.check(this.userSessionToken);
      this.setIsCouncilMember(cM);
      cm = cM;
    } catch (err) {
      console.log("Error:", err);
    } finally {
      return cm;
    }
  }
  login = async (credentials: UserLogin) => {
    try {
      const user = await agent.auth.login(credentials);

      this.resetAuthBeforeLogin();
      store.commonStore.setToken(user.jwt);
      const { cM } = await agent.dashboard.check(user.jwt);
      this.auth?.setToken(user.jwt);
      this.setUserSession(user.userInfo);
      this.setUserSessionToken(user.jwt);
      this.setIsCouncilMember(cM);
      runInAction(() => {
        router.navigate('/');
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  resetAuthBeforeLogin = () => {
    localStorage.clear();
    window.sessionStorage.clear();
    this.auth?.clearToken();
    this.stopRefreshTokenTimer();
    store.commonStore.setToken(undefined);
    this.userSession = null;
  }

  changePassword = async (
    changePassword: UserChangePassword,
    isChange: boolean,
    id: string | undefined,
    // token: string | undefined
  ) => {
    try {
      if (isChange) {
        changePassword.id = id;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  logout = async () => {
    try {
      store.commonStore.setToken(undefined);
      store.commonStore.setPaymentCustomerId(undefined);
      this.auth?.clearToken();
      window.localStorage.removeItem("jwt");
      localStorage.clear();
      window.sessionStorage.clear();
      this.setUserSession(null);
      this.setUserSessionToken(null)
    } catch (error) {
      console.log(error);
    }
  };

  register = async (
    registration: RegistrationForm,
    language?: string | undefined
  ) => {
    this.setSubmittingRegister(true);
    try {
      const registerDto = new RegistrationUserDto(registration);

      const uploadProfilePictureDto: UploadProfilePictureDto = { profilePicture: registration.profilePicture ?? '' };
      const incompletedAuthUserSession: MuslimWikiSession = await agent.auth.register(registerDto, language);
      const completedAuthUserSession: MuslimWikiSession = await agent.auth.uploadProfilePicture(incompletedAuthUserSession.jwt, uploadProfilePictureDto);

      this.auth?.setToken(completedAuthUserSession.jwt);
      this.setUserSessionToken(completedAuthUserSession.jwt);
      this.setUserSession(completedAuthUserSession.userInfo);

      this.setRegistrationSubmitted({
        submitted: true,
        expires: setExpirationDate(EXPIRE_TIME_SUBMITTED_REGISTRATION, new Date())
      });
      this.setRegistrationStep(0);
      this.setRegistrationValues(DEFAULT_REGISTER_FORM);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      this.setSubmittingRegister(false);
    }
  };
  verifyEmail = async (id: string, token: string) => {
    try {
      const verifiedUserSession: MuslimWikiSession = await agent.auth.verifyEmail(token, id);

      this.setUserSession(verifiedUserSession.userInfo);
      this.setUserSessionToken(verifiedUserSession.jwt);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  resetRegistration = async () => {
    this.registrationValues = DEFAULT_REGISTER_FORM;
    this.registrationStep = 0;
    this.registrationSubmitted = DEFAULT_REGISTRATION_SUBMITTED_CONFIG;
  };

  setSelectedUser = (values: UserFormValues) => {
    this.selectedUser = values;
  };

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }


  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };


  resetReturnMessage = () => {
    try {
      runInAction(() => {
        this.returnMessage = "";
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  get authUserToken() {
    return this.auth?.getToken();
  }

  getUserAuthSessionToken = async () => {
    if (this.userSessionToken)
      return this.userSessionToken;
    else {
      const persistedStore = await getPersistedStore(this);
      this.setUserSessionToken(persistedStore?.userSessionToken!);
      return persistedStore?.userSessionToken;
    }
  }
}
