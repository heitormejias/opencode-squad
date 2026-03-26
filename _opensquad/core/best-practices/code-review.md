# Code Review Best Practices

## Review Focus Areas

1. **Correctness**
   - Logic errors
   - Edge cases
   - Security vulnerabilities

2. **Performance**
   - Algorithm efficiency
   - Memory usage
   - Database queries

3. **Maintainability**
   - Code organization
   - Naming conventions
   - Documentation

4. **Style**
   - Consistent formatting
   - Follows project patterns
   - No code smells

## Review Checklist

```markdown
## Code Review: [File/Branch]

### Correctness
- [ ] Logic is correct
- [ ] Edge cases handled
- [ ] No security issues

### Performance  
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] Efficient algorithms

### Maintainability
- [ ] Clear naming
- [ ] Well-organized
- [ ] Adequate comments

### Style
- [ ] Follows style guide
- [ ] Consistent formatting
- [ ] No duplication

## Comments
[Detailed feedback]

## Approval Status
✅ Approved / ❌ Changes Requested
```

## Severity Levels

- **Critical**: Must fix before merge
- **Major**: Should fix before merge
- **Minor**: Optional improvements
- **Suggestion**: Ideas for future

## Quality Criteria

- [ ] All critical issues addressed
- [ ] Review is constructive
- [ ] Specific examples provided
- [ ] Actionable feedback
