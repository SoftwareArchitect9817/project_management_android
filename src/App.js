import React, { useEffect, useReducer } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import { BottomModalContainer } from './components';
import AppStack from './navigators/Stack';
import initialState from './store/state';
import reducer from './store/reducer';
import { AuthContext } from './context';
import { navigationRef } from './navigators/RootNavigation';
import axios from 'axios';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.post('http://192.168.1.166:8080/api/userStates/user_state_info');
        console.log(res.data);
        if (res.data.status) {
          dispatch({
            type: 'user',
            payload: res.data.userinfo
          })
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const res = await axios.post('http://192.168.1.166:8080/api/projectStates/project_state_info');
        console.log(res.data);
        if (res.data.status) {
          let projects = res.data.projectinfo;
          for (let project of projects) {
            project.team = JSON.parse(project.team);
          }
          dispatch({
            type: 'project',
            payload: projects
          })
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const res = await axios.post('http://192.168.1.166:8080/api/memberStates/member_state_info');
        console.log(res.data);
        if (res.data.status) {
          dispatch({
            type: 'member',
            payload: res.data.memberinfo
          })
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const res = await axios.post('http://192.168.1.166:8080/api/taskStates/task_state_info');
        console.log(res.data);
        if (res.data.status) {
          let tasks = res.data.taskinfo;
          for (let task of tasks) {
            task.members = JSON.parse(task.members);
          }
          dispatch({
            type: 'task',
            payload: tasks
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
    load();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}>
      <PaperProvider>
        <MenuProvider>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.areaContainer}>
            <NavigationContainer ref={navigationRef}>
              <AppStack />
            </NavigationContainer>
            {state?.bottomModal ? <BottomModalContainer /> : null}
          </SafeAreaView>
        </MenuProvider>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});

export default App;
