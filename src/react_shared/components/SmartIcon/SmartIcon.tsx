import React from 'react';

/** optimized */
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Add from '@material-ui/icons/Add';
import Work from '@material-ui/icons/Work';
import Today from '@material-ui/icons/Today';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Settings from '@material-ui/icons/Settings';
import Search from '@material-ui/icons/Search';
import School from '@material-ui/icons/School';
import ReportProblem from '@material-ui/icons/ReportProblem';
import Report from '@material-ui/icons/Report';
import Stars from '@material-ui/icons/Stars';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import Phone from '@material-ui/icons/Phone';
import PersonPin from '@material-ui/icons/PersonPin';
import Notifications from '@material-ui/icons/Notifications';
import MoreVert from '@material-ui/icons/MoreVert';
import LocationOn from '@material-ui/icons/LocationOn';
import Link from '@material-ui/icons/Link';
import Language from '@material-ui/icons/Language';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Info from '@material-ui/icons/Info';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Home from '@material-ui/icons/Home';
import FolderOpen from '@material-ui/icons/FolderOpen';
import FileCopy from '@material-ui/icons/FileCopy';
import Feedback from '@material-ui/icons/Feedback';
import Error from '@material-ui/icons/Error';
import DoneAll from '@material-ui/icons/DoneAll';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import CardTravelSharp from '@material-ui/icons/CardTravelSharp';
import BrightnessAuto from '@material-ui/icons/BrightnessAuto';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Assessment from '@material-ui/icons/Assessment';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import TrendingUp from '@material-ui/icons/TrendingUp';

interface ISmartIconProps {
  icon: string;
  color?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'action'
    | 'disabled'
    | 'error'
    | undefined;
  className?: string;
  onClick?: () => void;
}

/**
 * Так как иконки переиспользуются в нескольких местах в приложение, было принято решение создать компонент
 * На вход: icon='sWidgetCode'
 * На выход: получаем нужную <Icon />
 * Примеры:
 * <SmartIcon icon='aJobs' /> превратится в <Work />
 * <SmartIcon icon='aJobs' color='primary' /> превратится в <Work /> синего цвета
 */

const SmartIcon: React.FC<ISmartIconProps> = ({
  icon,
  color,
  className,
  onClick
}) => {
  const smartProfileIconMappingTable: { [key: string]: React.ReactNode } = {
    oJobs: <Work color={color} className={className} onClick={onClick} />,
    oFuncExperience: (
      <AccountBalance color={color} className={className} onClick={onClick} />
    ),
    oLeadExperience: (
      <SupervisorAccount
        color={color}
        className={className}
        onClick={onClick}
      />
    ),
    o5plusEstimate: (
      <Assessment color={color} className={className} onClick={onClick} />
    ),
    oEducation: (
      <School color={color} className={className} onClick={onClick} />
    ),
    oCertificates: (
      <AssignmentTurnedIn
        color={color}
        className={className}
        onClick={onClick}
      />
    ),
    oAdditionalInfo: (
      <Info color={color} className={className} onClick={onClick} />
    ),
    oLanguage: (
      <Language color={color} className={className} onClick={onClick} />
    ),
    oSuccessor: (
      <AssignmentInd color={color} className={className} onClick={onClick} />
    ),
    oMainInfo: <Work color={color} className={className} onClick={onClick} />,
    oBankActivities: (
      <AccessibilityNew color={color} className={className} onClick={onClick} />
    ),
    oAward: <Stars color={color} className={className} onClick={onClick} />,
    oSkills: <Work color={color} className={className} onClick={onClick} />,
    oAchievements: (
      <Stars color={color} className={className} onClick={onClick} />
    ),
    o360Estimate: (
      <Work color={color} className={className} onClick={onClick} />
    ),
    oOrgStruct: <Work color={color} className={className} onClick={onClick} />,
    aboutMe: (
      <PersonPin color={color} className={className} onClick={onClick} />
    ),
    oDebtRecovery: (
      <Report color={color} className={className} onClick={onClick} />
    ),
    externalEducation: (
      <ImportContacts color={color} className={className} onClick={onClick} />
    ),
    oPsychotest: <Work color={color} className={className} onClick={onClick} />,
    oProfActivity: (
      <TrendingUp color={color} className={className} onClick={onClick} />
    ),

    // иконки, не относящиеся к виджетам
    error: <Error color='error' className={className} onClick={onClick} />,
    bulletLabel: (
      <PlayArrowOutlined
        color={color}
        className={className}
        onClick={onClick}
      />
    ),
    bulletProblem: (
      <ReportProblem color={color} className={className} onClick={onClick} />
    ),
    addCircle: (
      <AddCircleOutline color={color} className={className} onClick={onClick} />
    ),
    check: <Check color={color} className={className} onClick={onClick} />,
    edit: <Create color={color} className={className} onClick={onClick} />,
    arrowDown: (
      <KeyboardArrowDown
        color={color}
        className={className}
        onClick={onClick}
      />
    ),
    arrowRight: (
      <KeyboardArrowRight
        color={color}
        className={className}
        onClick={onClick}
      />
    ),
    close: <Close color={color} className={className} onClick={onClick} />,
    settings: (
      <Settings color={color} className={className} onClick={onClick} />
    ),
    home: <Home color={color} className={className} onClick={onClick} />,
    phone: <Phone color={color} className={className} onClick={onClick} />,
    calendar: <Today color={color} className={className} onClick={onClick} />,
    cellPhone: (
      <PhoneIphone color={color} className={className} onClick={onClick} />
    ),
    location: (
      <LocationOn color={color} className={className} onClick={onClick} />
    ),
    email: (
      <AlternateEmail color={color} className={className} onClick={onClick} />
    ),
    vertDots: (
      <MoreVert color={color} className={className} onClick={onClick} />
    ),
    brightnessAuto: (
      <BrightnessAuto color={color} className={className} onClick={onClick} />
    ),
    add: <Add color={color} className={className} onClick={onClick} />,
    copy: <FileCopy color={color} className={className} onClick={onClick} />,
    folder: (
      <FolderOpen color={color} className={className} onClick={onClick} />
    ),
    link: <Link color={color} className={className} onClick={onClick} />,
    delete: <Delete color={color} className={className} onClick={onClick} />,
    search: <Search color={color} className={className} onClick={onClick} />,

    arrowForward: (
      <ArrowForward color={color} className={className} onClick={onClick} />
    ),
    arrowUpward: (
      <ArrowUpward color={color} className={className} onClick={onClick} />
    ),
    arrowDownward: (
      <ArrowDownward color={color} className={className} onClick={onClick} />
    ),
    doneAll: <DoneAll color={color} className={className} onClick={onClick} />,

    travel: (
      <CardTravelSharp color={color} className={className} onClick={onClick} />
    ),
    notifications: (
      <Notifications color={color} className={className} onClick={onClick} />
    ),
    back: <ArrowBack color={color} className={className} onClick={onClick} />,
    feedback: <Feedback color={color} className={className} onClick={onClick} />
  };
  !smartProfileIconMappingTable[icon] && console.error(icon);
  return (
    <>
      {smartProfileIconMappingTable[icon] ||
        smartProfileIconMappingTable['error']}
    </>
  );
};

export default SmartIcon;
