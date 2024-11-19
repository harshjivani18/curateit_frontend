import { combineReducers }          from 'redux';
import MembershipReducer            from './membership';
import AppReducer                   from './app';
import GemReducer                   from './gems'
import CollectionReducer            from './collection'
import TagReducer                   from './tags'
import ActivityReducer              from './activity'
import BookmarkReducer              from './bookmark'
import UserReducer                  from './user'
import BrokenDuplicateReducer       from './broken-duplicate'
import CommentReducer               from './comment'
import AnalyticsReducer             from './analytics'
import DashboardReducer             from './dashboard'
import PlanServiceReducer           from './plan-service'
import AIBrandsReducer              from './ai-brands'

const rootReducer = combineReducers({
    app: AppReducer,
    user: MembershipReducer,
    gems: GemReducer,
    collections: CollectionReducer,
    tags: TagReducer,
    activity: ActivityReducer,
    allBookmarks: BookmarkReducer,
    users: UserReducer,
    brokenDuplicate: BrokenDuplicateReducer,
    comments: CommentReducer,
    analytics: AnalyticsReducer,
    dashboard: DashboardReducer,
    planService: PlanServiceReducer,
    aiBrands: AIBrandsReducer
});

export default rootReducer;