# task-manager
REST API for a simple task manager app
-Stores to-do lists of authenticated users
-uses hashing to store passwords
-User authentication enabled
-has end-points to upload files to database
-queries for sorting, pagination and Filtering  
    sort:  {{url}}/?sortBy=key_asc
    pagination: {{url}}/?limit=int&skip=int   limits no. of items to 'int' per page (can be used with bootstrap UIs at front end)
    Filtering: {{url}}/?key=value

