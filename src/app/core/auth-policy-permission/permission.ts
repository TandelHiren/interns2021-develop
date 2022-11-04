/** This enum for permission */
export enum AllPermissions {

  APPLICATION_LIST = 'Application_List',
  APPLICATION_CRUD = 'Application_CRUD',
  OVERVIEW = 'Overview',
  SCREEN_LIST = 'Screen_List',
  SCREEN_CRUD = 'Screen_CRUD',
  LOCATOR_LIST = 'Locator_List',
  LOCATOR_CRUD = 'Locator_CRUD',
  TEST_CASE_LIST = 'Test_Case_List',
  Test_Case_CRUD = 'Test_Case_CRUD',
  APPROVE_TEST_CASE = 'Approve_Test_Case',
  EXPORT_TEST_CASE = 'Export_Test_Case',
  CLONE_TEST_CASE = 'Clone_Test_Case',
  TEST_SUITE_LIST = 'Test_Suite_List',
  TEST_SUITE_CRUD = 'Test_Suite_CRUD',
  LINKED_TEST_CASE_LIST = 'Linked_Test_Case_List',
  LINK_UNLINK_TEST_CASE = 'Link_Unlink_Test_Case',
  EXECUTION_LIST = 'Execution_List',
  START_NEW_EXECUTION = 'Start_New_Execution',
  VIEW_EXECUTION_RESULT = 'View_Execution_Result',
  LAUNCH_MANUAL_EXECUTION = 'Launch_Manual_Execution',
  STOP_EXECUTION = 'Stop_Execution',
  USER_MANAGEMENT = 'User_Management',
  APPLICATION_ACCESS = 'Application_Access',
  CHANGE_PASSWORD = 'Change_Password',
  AUTOMATE_TEST_CASE = 'Automate_Test_Case',
  VIEW_TEST_CASE_VERSION = 'View_Test_Case_Version',
  APPLICATION_VIEW_ONLY ='Application_ViewOnly',
  SECURITY_SCAN_CRUD ='Security_Scan_CRUD',
  SECURITY_SCAN_VIEW_ONLY = 'Security_Scan_ViewOnly'
};


/** It contain Roles */
export enum RoleEnum {
  /** Admin  */
  ADMIN = 'Admin',
  /** Manager */
  Manager = 'Manager',
  /** Lead */
  LEAD = 'Lead',
  /** QA */
  QA = 'Qa'
}

/** Role permission */
export class RolesPermissions {
  /** It contains roles */
  public roles: string[];
  /** It contains permission */
  public permissions : string[]
}
