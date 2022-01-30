# task-manager
REST API for a simple task manager app <br>
-Stores to-do lists of authenticated users <br>
-uses hashing to store passwords<br>
-User authentication enabled<br>
-has end-points to upload files to database<br>
-queries for sorting, pagination and Filtering <br> 
    sort:  {{url}}/?sortBy=key_asc<br>
    pagination: {{url}}/?limit=int&skip=int   limits no. of items to 'int' per page (can be used with bootstrap UIs at front end)<br>
    Filtering: {{url}}/?key=value<br>

| Key                 | Value                              |
| ------------------- | ---------------------------------- |
| Document Type       | $DOC_TYPE                          |
| Document Authorizer | $COMMITTER_NAME ($COMMITTER_EMAIL) |
| Publication Date    | $GEN_DATE                          |
| Version Number      | $VERSION_NUM ($GIT_SHA)            |
[Table caption, works as a reference][section-mmd-tables-table1]
